# mesh-grpc-bug

This is a repo for the purpose of reproducing a current bug in graphql-mesh v1 which causes only the last (alphabetically) service added to work

How to run:
1. start store-api and pet-api using node `node api.js` f.e on both api's
2. run `npm run start` in the main directory
3. go to `localhost:4000/graphql`
4. Try doing both GetAllPets and GetAllPetStores, this will return all petstores but error on petservice
5. Rename the "Stores" service in `mesh.config.ts` to "AStores"
6. restart & rebuild the mesh service
7. retry step 4, this time the petstore will error with the same error