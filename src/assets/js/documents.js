const customerDocuments = [
    {
        name: "Copie du Kbis",
        description: "Moins de 3 mois",
        condition: (customer) => { return customer.type === 'company' }
    },
    {
        name: "Copie des statuts de l'entreprise",
        condition: (customer) => { return customer.type === 'company' }
    },
    {
        name: "Copie du certificat de mariage",
        condition: (customer) => { return customer.weddingContract }
    },
    {
        name: "Copie du contrat de mariage",
        condition: (customer) => {
            return customer.maritalStatus.type === 'married' && customer.maritalStatus.weddingContract
        }
    },
    {
        name: "Copie du récépissé de pacs",
        condition: (customer) => { return customer.maritalStatus.type === 'pacsed' }
    },
    {
        name: "Copie du jugement ou convention de divorce",
        condition: (customer) => { return customer.maritalStatus.type === 'divorced' }
    },
    {
        name: "Renseignement complet d'Etat civil de tous les ex-époux(se)",
        description: "Nom, prénoms, date et lieu de naissance, date et lieu de mariage, date et lieu de divorce",
        condition: (customer) => { return customer.maritalStatus.type === 'divorced' }
    }
];

const personalDocuments = [
    {
        name: "Copie de la carte nationale d'identité ou du passeport",
        condition: () => { return true }
    },
    {
        name: "Copie de la carte d'invalidité",
        condition: (identity) => { return identity.disability }
    },
    {
        name: "Copie de la carte de séjour",
        condition: (identity) => { return identity.stranger }
    }
];

const sellerBuildingDocuments = [
    {
        name: "Copie du titre de propriété",
        condition: () => { return true }
    },
    {
        name: "Copie de la dernière taxe foncière du bien vendu",
        condition: () => { return true }
    },
    {
        name: "Copie du RIB",
        condition: () => { return true }
    },
    {
        name: "Montant des frais d'agence",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Mandat de l'agence immobilière ou du mandataire immobilier",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Coordonnées de la banque responsable de l'emprunt immobilier",
        description: "Même si l'emprunt est intégralement remboursé",
        condition: (building) => { return building.loan }
    },
    {
        name: "Références de l'emprunt immobilier",
        description: "Même si l'emprunt est intégralement remboursé",
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
    },
    {
        name: "Déclaration préalable",
        condition: (building) => { return building.type === 'constructibleLandInSubdivision' && building.priorStatement }
    },
    {
        name: "Permis d'aménager",
        condition: (building) => { return building.type === 'constructibleLandInSubdivision' && building.arrangeLicence }
    },
    {
        name: "DAACT - Déclaration attestant l'achèvement et la conformité des travaux",
        condition: (building) => {
            return building.type === 'constructibleLandInSubdivision' ||
                (building.type === 'house' && building.lessThanTenYears)
        }
    },
    {
        name: "Règlement de copropriété ou état descriptif de division",
        description: "Joindre les modificatifs",
        condition: (building) => { return building.type === 'coownershipLot' }
    },
    {
        name: "Carnet d'entretien du lot de copropriété",
        condition: (building) => { return building.type === 'coownershipLot' }
    },
    {
        name: "PVs d'assemblées générales des trois dernières années",
        condition: (building) => { return building.type === 'coownershipLot' }
    },
    {
        name: "Pré état daté",
        condition: (building) => { return building.type === 'coownershipLot' }
    },
    {
        name: "Diagnostics de la partie privative",
        condition: (building) => { return building.type === 'coownershipLot' }
    },
    {
        name: "Certificat Loi Carrez",
        condition: (building) => { return building.type === 'coownershipLot' || building.type === 'commercialBuilding' }
    },
    {
        name: "Diagnostic plomb des parties communes",
        condition: (building) => { return building.type === 'coownershipLot' && building.before1949 && building.before1997 }
    },
    {
        name: "Diagnostic amiante des parties communes",
        condition: (building) => { return building.type === 'coownershipLot' && building.before1997 }
    },
    {
        name: "Diagnostic technique global",
        condition: (building) => { return building.type === 'coownershipLot' && building.immatriculated10Years }
    },
    {
        name: "Diagnostic amiante",
        description: "Durée de validité: illimitée",
        condition: (building) => { return (building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house') && building.before1997 }
    },
    {
        name: "Diagnostic parasitaire",
        description: "Durée de validité: 3 mois en cas de diagnostic positif, 6 mois en cas de diagnostic négatif",
        condition: (building) => { return building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house' }
    },
    {
        name: "DPE - Diagnostic de performance énergétique",
        description: "Durée de validité: 10 ans",
        condition: (building) => { return building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house' }
    },
    {
        name: "ERP - Etats des risques et pollutions",
        condition: (building) => { return building.type === 'commercialBuilding' }
    },
    {
        name: "Diagnostic plomb",
        description: "Durée de validité: illimitée en cas de diagnostic négatif, 1 an en cas de diagnostic positif",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.before1949 && building.before1997 }
    },
    {
        name: "Diagnostic électricité",
        description: "Durée de validité: 3 ans",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.electricalMoreThan15Years }
    },
    {
        name: "Diagnostic gaz",
        description: "Durée de validité: 3 ans",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.cityGas && building.cityGasMoreThan15Years }
    },
    {
        name: "Permis de construire",
        condition: (building) => { return building.type === 'house' && building.lessThanTenYears }
    },
    {
        name: "Certificat de non opposition de la Mairie",
        condition: (building) => { return building.type === 'house' && building.lessThanTenYears }
    },
    {
        name: "Assurance dommage ouvrage",
        description: "Souscrite par le vendeur",
        condition: (building) => { return building.type === 'house' && building.lessThanTenYears }
    },
    {
        name: "Assurance en responsabilité",
        description: "Souscrite par le constructeur",
        condition: (building) => { return building.type === 'house' && building.lessThanTenYears }
    },
    {
        name: "Copie du bail",
        condition: (building) => { return building.currentResidents === 'rented' }
    },
    {
        name: "Copie de l'état des lieux",
        condition: (building) => { return building.currentResidents === 'rented' }
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
            return document.condition(info.building)
        });
    } else if (info.customer.goal === 'sell') {
        result.building = sellerBuildingDocuments.filter((document) => {
            return document.condition(info.building)
        });
    }
    return result;
}
