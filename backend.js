const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')
const express = require('express')

const typeDefs = `
  type Entry {
    name: String!
    isFolder: Boolean!
    href: String!
  }
  type Query {
    ls(directory: String!): [Entry!]!
    lsBatch(directories: [String!]!): [[Entry!]!]!
  }
  type Mutation {
    write(href: String!, contents: String!): Boolean
  }
`

const ls = directory => {
  try {
    const dir = fs.opendirSync('data/' + directory)
    let results = []
    let entry
    while (entry = dir.readSync()) {
      results.push({
        name: entry.name,
        isFolder: !entry.isFile(),
        href: `/api/${directory}/${entry.name}`.replace(/\/+/g, '/')
      })
    }
    dir.closeSync()
    return results
  } catch (e) {
    return []
  }
}

const write = (href, contents) => {
  try {
    const file = fs.openSync('data/' + href.replace(/^\/?api\/?/, ''), fs.constants.O_WRONLY)
    fs.writeFileSync(file, contents)
    fs.closeSync(file)
  } catch (e) {
    console.error(e)
    return false
  }
  return true
}

const resolvers = {
  Query: {
    ls: (_, args) => ls(args.directory),
    lsBatch: (_, args) => args.directories.map(ls),
  },
  Mutation: {
    write: (_, args) => write(args.href, args.contents),
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.express.use(express.static('data'))
server.start(() => console.log(`Server is running at http://localhost:4000`))