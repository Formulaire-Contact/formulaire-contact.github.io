const allDocuments = {
    identityCard: {
        name: "Carte nationale d'identité",
        description: ""
    },
    kbis: {
        name: "Kbis",
        description: ""
    }
};


export function getDocuments(info) {
    let documents = [];

    if (info.seller.type === 'person') {
        documents.push(allDocuments.identityCard);
    }

    return documents;
}
