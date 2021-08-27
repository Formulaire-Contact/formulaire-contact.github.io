const customerDocuments = [
    {
        name: "Carte nationale d'identité ou Passeport",
        condition: (customer) => { return customer.type === 'person' }
    },
    {
        name: "Carte d'invalidité",
        condition: (customer) => { return customer.type === 'person' }
    },
    {
        name: "Kbis",
        condition: (customer) => { return customer.type === 'company' }
    },
    {
        name: "Statuts de l'entreprise",
        condition: (customer) => { return customer.type === 'company' }
    },
    {
        name: "Certificat de mariage",
        condition: (customer) => { return customer.weddingContract }
    },
    {
        name: "Contrat de mariage",
        condition: (customer) => {
            return customer.maritalStatus.type === 'married' && customer.maritalStatus.weddingContract
        }
    },
    {
        name: "Récépissé de pacs",
        condition: (customer) => { return customer.maritalStatus.type === 'pacsed' }
    },
    {
        name: "Jugement ou convention de divorce",
        condition: (customer) => { return customer.maritalStatus.type === 'divorced' }
    },
    {
        // TODO: A préciser
        name: "Renseignement complet d'Etat civil (de l'ex-époux ?)",
        condition: (customer) => { return customer.maritalStatus.type === 'divorced' }
    }
];

const personalDocuments = [
    {
        name: "Carte nationale d'identité ou Passeport",
        condition: () => { return true }
    },
    {
        name: "Carte d'invalidité",
        condition: (identity) => { return identity.disability }
    },
    {
        name: "Carte de séjour",
        condition: (identity) => { return identity.stranger }
    }
];

const sellerBuildingDocuments = [
    {
        name: "Titre de propriété",
        condition: () => { return true }
    },
    {
        name: "Dernière taxe foncière",
        condition: () => { return true }
    },
    {
        name: "RIB",
        condition: () => { return true }
    },
    {
        name: "Montant du séquestre (dépôt de garantie) convenu avec l'acquéreur",
        condition: (building) => { return !building.guaranteeAgreed }
    },
    {
        name: "Montant des frais d'agence",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Frais d’agence à la charge du vendeur ou de l’acquéreur",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Mandat de l'agence immobilière ou du mandataire immobilier",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Coordonnées de la banque responsable de l'emprunt immobilier",
        condition: (building) => { return building.loan }
    },
    {
        name: "Références de l'emprunt immobilier",
        condition: (building) => { return building.loan }
    },
    {
        name: "Plan de bornage",
        condition: (building) => {
            return building.type === 'land' ||
                building.type === 'constructibleLand' ||
                building.type === 'constructibleLandInSubdivision'
        }
    },
    {
        name: "Plan de division",
        condition: (building) => {
            return building.type === 'land' ||
                building.type === 'constructibleLand' ||
                building.type === 'constructibleLandInSubdivision'
        }
    }
];

const buyerBuildingDocuments = [];


export function getDocuments(info) {
    let result = {};
    result.customer = customerDocuments.filter((document) => {
        return document.condition(info.customer)
    });
    if (info.customer.type === 'person') {
        result.identities = info.customer.identities.map((identity => {
            return {
                identity: identity,
                documents: personalDocuments.filter((document) => {
                    return document.condition(identity)
                })
            }
        }));
    }
    if (info.customer.goal === 'buy') {
        result.building = buyerBuildingDocuments.filter((document) => {
            return document.condition(info)
        });
    } else if (info.customer.goal === 'sell') {
        result.building = sellerBuildingDocuments.filter((document) => {
            return document.condition(info)
        });
    }
    return result;
}
