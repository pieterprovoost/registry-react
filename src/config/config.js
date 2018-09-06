module.exports = {
    dataApi: 'https://api.gbif-uat.org/v1/',
    userAdminApi: 'https://registry.gbif-uat.org/admin/user/',
    subrouteMappings: {
        'hostedDataset': 'dataset',
        'publishedDataset': 'dataset',
        'constituents': 'dataset',
        'pendingEndorsement': 'organization'
    }
}