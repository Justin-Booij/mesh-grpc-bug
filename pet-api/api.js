const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const {ReflectionService} = require('@grpc/reflection');

// Load the protobuf file
const PROTO_PATH = path.join(__dirname, 'pets.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const petsProto = grpc.loadPackageDefinition(packageDefinition).pets;
const reflection = new ReflectionService(packageDefinition);

// Static pet store data
const pets = [
    {id: 1, name: 'Pet1'},
    {id: 2, name: 'Pet2'},
    {id: 3, name: 'Pet3'},
    {id: 4, name: 'Pet4'},
    {id: 5, name: 'Pet5'},
];

// gRPC service methods
const petService = {
    GetAllPets: (call, callback) => {
        callback(null, {pets});
    }
};

// Start the server
function main() {
    const server = new grpc.Server();
    server.addService(petsProto.PetService.service, petService);
    reflection.addToServer(server)

    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC Server running with reflection on port 50052');
        server.start();
    });
}

main();
