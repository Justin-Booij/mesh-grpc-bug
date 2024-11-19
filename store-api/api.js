const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const {ReflectionService} = require('@grpc/reflection');

// Load the protobuf file
const PROTO_PATH = path.join(__dirname, 'petstore.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const petstoreProto = grpc.loadPackageDefinition(packageDefinition).petstore;
const reflection = new ReflectionService(packageDefinition);

// Static pet store data
const petStores = [
    {id: 1, location: 1, name: 'Happy Paws Pet Store', petsForSale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
    {id: 2, location: 1, name: 'Pet Paradise', petsForSale: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]},
    {id: 3, location: 2, name: 'Furry Friends', petsForSale: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
    {id: 4, location: 3, name: 'Paws and Claws', petsForSale: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]},
    {id: 5, location: 4, name: 'The Pet Shop', petsForSale: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]},
];

// gRPC service methods
const petStoreService = {
    GetAllPetStores: (call, callback) => {
        callback(null, {petStores});
    },

    GetPetStorePets: (call, callback) => {
        const storeId = call.request.id;
        const petStore = petStores.find(store => store.id === storeId);
        if (!petStore) {
            return callback({
                code: grpc.status.NOT_FOUND,
                message: 'Pet store not found',
            });
        }
        callback(null, petStore);
    }
};

// Start the server
function main() {
    const server = new grpc.Server();
    server.addService(petstoreProto.PetStoreService.service, petStoreService);
    reflection.addToServer(server)

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC Server running with reflection on port 50051');
        server.start();
    });
}

main();
