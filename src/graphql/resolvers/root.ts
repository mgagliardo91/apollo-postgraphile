export default {
  Mutation: {},
  Query: {
    me() {
      return {
        __typename: 'Test'
      }
    },
    branch() {
      return 'Branch'
    }
  },
  Facility: {
    branch(facility: any) {
      return JSON.stringify(facility)
    }
  },
  Test: {
    facility(test: any) {
      return {
        __typename: 'Facility',
        id: 1
      }
    }
  }
}