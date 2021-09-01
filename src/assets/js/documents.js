const customerDocuments = [
    {
        name: "Kbis",
        description: "Moins de 3 mois",
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
        name: "Renseignement complet d'Etat civil de tous les ex-époux(se)",
        description: "Nom, prénoms, date et lieu de naissance, date et lieu de mariage, date et lieu de divorce",
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
        name: "Dernière taxe foncière du bien vendu",
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
        condition: (building) => { return building.type === 'coownershipLot' && building.before1949 }
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
        condition: (building) => { return building.type === 'commercialBuilding' && building.before1997 }
    },
    {
        name: "Diagnostic parasitaire",
        condition: (building) => { return building.type === 'commercialBuilding' }
    },
    {
        name: "DPE - Diagnostic de performance énergétique",
        condition: (building) => { return building.type === 'commercialBuilding' }
    },
    {
        name: "ERP - Etats des risques et pollutions",
        condition: (building) => { return building.type === 'commercialBuilding' }
    },
    {
        name: "Ensemble des diagnostics valides",
        condition: (building) => { return building.type === 'house' }
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
    console.log(result);
    return result;
}
