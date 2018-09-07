module.exports = {
    dataApi: 'https://api.gbif-dev.org/v1/',
    userAdminApi: 'https://registry.gbif-dev.org/admin/user/',
    subrouteMappings: {
        'hostedDataset': 'dataset',
        'publishedDataset': 'dataset',
        'constituents': 'dataset',
        'pendingEndorsement': 'organization'
    }
}