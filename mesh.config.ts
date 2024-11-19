import {createRenameFieldTransform, createRenameTransform, defineConfig, loadGraphQLHTTPSubgraph} from '@graphql-mesh/compose-cli'
import {loadOpenAPISubgraph} from '@omnigraph/openapi'
import {loadGrpcSubgraph} from '@omnigraph/grpc'

export const composeConfig = defineConfig({
    subgraphs: [
        {
            sourceHandler: loadGrpcSubgraph('Pets', {
                endpoint: 'localhost:50052',
                source: './pet-api/pets.proto' // only needed when not running reflection
            })
        },
        {

            sourceHandler: loadGrpcSubgraph('Stores', {
                endpoint: 'localhost:50051',
                source: './store-api/petstore.proto' // only needed when not running reflection
            }),
        }
    ]
})