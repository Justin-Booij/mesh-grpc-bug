# mesh-grpc-bug

This is a repo for the purpose of reproducing an [issue](https://github.com/ardatan/graphql-mesh/issues/7962 ) which causes only the last (alphabetically) grpc service added to work properly.
The alphabetically last grpc service will run properly, while the rest errors with the message:
`Object at path xx.xxService is not a Service constructor` 

expected behaviour is that all services would run without issue.

How to run:
1. start store-api and pet-api using node `node api.js` f.e on both api's
2. run `npm run start` in the main directory
3. go to `localhost:4000/graphql`
4. Try doing both GetAllPets and GetAllPetStores, this will return all petstores but error on petservice
5. Rename the "Stores" service in `mesh.config.ts` to "AStores"
6. restart & rebuild the mesh service
7. retry step 4, this time the petstore will error with the same error