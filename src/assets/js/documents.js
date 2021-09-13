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
    },
    {
        name: "Copie du RIB",
        condition: () => { return true }
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
        name: "Montant des frais d'agence",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Mandat de l'agence immobilière ou du mandataire immobilier",
        condition: (building) => { return building.realEstateAgency }
    },
    {
        name: "Coordonnées de la banque responsable de l'emprunt immobilier",
        description: "Même si l'emprunt a été intégralement remboursé",
        condition: (building) => { return building.loan }
    },
    {
        name: "Références de l'emprunt immobilier",
        description: "Même si l'emprunt a été intégralement remboursé",
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
        condition: (building) => { return building.type === 'constructibleLandInSubdivision' && building.subdivisionType === 'priorStatement' }
    },
    {
        name: "Permis d'aménager",
        condition: (building) => { return building.type === 'constructibleLandInSubdivision' && building.subdivisionType === 'arrangeLicense' }
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
        name: "Certificat Loi Carrez valide",
        description: "Durée de validité: illimitée en l’absence de travaux",
        condition: (building) => { return building.type === 'coownershipLot' || building.type === 'commercialBuilding' }
    },
    {
        name: "Diagnostic amiante valide",
        description: "Durée de validité: illimitée",
        condition: (building) => { return (building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house') && building.before1997 }
    },
    {
        name: "Diagnostic parasitaire valide",
        description: "Durée de validité: 3 mois en cas de diagnostic positif, 6 mois en cas de diagnostic négatif",
        condition: (building) => { return building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house' }
    },
    {
        name: "DPE - Diagnostic de performance énergétique valide",
        description: "Durée de validité: 10 ans",
        condition: (building) => { return building.type === 'commercialBuilding' || building.type === 'coownershipLot' || building.type === 'house' }
    },
    {
        name: "ERP - Etats des risques et pollutions",
        condition: (building) => { return building.type === 'commercialBuilding' }
    },
    {
        name: "Diagnostic plomb valide",
        description: "Durée de validité: illimitée en cas de diagnostic négatif, 1 an en cas de diagnostic positif",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.before1949 && building.before1997 }
    },
    {
        name: "Diagnostic électricité valide",
        description: "Durée de validité: 3 ans",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.electricalMoreThan15Years }
    },
    {
        name: "Diagnostic gaz valide",
        description: "Durée de validité: 3 ans",
        condition: (building) => { return (building.type === 'coownershipLot' || building.type === 'house') && building.cityGas && building.cityGasMoreThan15Years }
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
        name: "Diagnostic technique global des parties communes",
        condition: (building) => { return building.type === 'coownershipLot' && building.immatriculated10Years }
    },
    {
        name: "Contrôle d’assainissement valide",
        description: "Durée de validité: 3 ans",
        condition: (building) => {
            return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') &&
            (building.sanitation === 'septicTank')
        }
    },
    {
        name: "Contrôle d’assainissement valide (optionnel)",
        description: "Durée de validité: 3 ans",
        condition: (building) => {
            return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') &&
                (building.sanitation === 'sewers' && building.sanitationControled)
        }
    },
    {
        name: "Contrat de location de la citerne de gaz",
        condition: (building) => { return (building.type === 'house' || building.type === 'commercialBuilding') && building.gazTankRented }
    },
    {
        name: "Attestation d’entretien de la pompe à chaleur ou de la chaudière valide",
        description: "Durée de validité: 1 an",
        condition: (building) => { return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') && building.heatPump }
    },
    {
        name: "Attestation de ramonage valide pour la(les) cheminée(s)",
        description: "Durée de validité: 1 an",
        condition: (building) => { return (building.type === 'house' || building.type === 'commercialBuilding') && building.firePlace && building.firePlaceCount > 0 }
    },
    {
        name: "Attestation de ramonage valide pour le(les) poêle(s)",
        description: "Durée de validité: 1 an",
        condition: (building) => { return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') && building.stove && building.stoveCount > 0 }
    },
    {
        name: "Déclaration en mairie du récupérateur d'eau",
        condition: (building) => { return (building.type === 'house' || building.type === 'commercialBuilding') && building.waterCollector }
    },
    {
        name: "Tous renseignements utiles sur la nature des travaux effectués",
        description: "Joindre les autorisations requises (déclaration préalable, permis de construire, DAACT, certificat de non-opposition) ainsi que la liste des entreprises étant intervenues et les factures associées",
        condition: (building) => { return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') && building.houseWorks }
    },
    {
        name: "Tous renseignements utiles sur la nature du(des) sinistre(s)",
        condition: (building) => { return (building.type === 'house' || building.type === 'coownershipLot' || building.type === 'commercialBuilding') && building.sinister }
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
        condition: (building) => { return building.currentResidents === 'rented' || building.currentResidents === 'rentedFarming' }
    },
    {
        name: "Copie de l'état des lieux",
        condition: (building) => { return building.currentResidents === 'rented' }
    }
];

const buyerBuildingDocuments = [
    {
        name: "Coordonnées de votre banque et de votre conseiller",
        description: "Les coordonnées de votre notaire sont également à fournir au conseiller clientèle de votre banque",
        condition: () => { return true }
    }
];

const sellerContractDay = [

];

const buyerContractDay = [
    {
        name: "Attestation(s) d'origine des fonds fournie par la(les) banque(s)",
        condition: (info) => { return info.building.fundingType === 'ownMoney' || info.building.fundingType === 'loanAndOwnMoney' }
    },
    {
        name: "Garantie du prêt",
        description: "Si la garantie est un PPD et/ou une hypothèque, un acte notarié et des frais supplémentaires sont à prévoir",
        condition: (info) => { return info.building.fundingType === 'loan' || info.building.fundingType === 'loanAndOwnMoney' }
    },
    {
        name: "Copie de l'offre de prêt",
        condition: (info) => { return info.building.fundingType === 'loan' || info.building.fundingType === 'loanAndOwnMoney' }
    },
    {
        name: "Attestation d'assurance habitation",
        description: "A fournir le jour de la signature de l'acte authentique de vente",
        condition: () => { return true }
    }
];


export function getDocuments(info) {
    let result = { identities: [] };
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
        result.contractDay = buyerContractDay.filter((document) => {
            return document.condition(info)
        });
    } else if (info.customer.goal === 'sell') {
        result.building = sellerBuildingDocuments.filter((document) => {
            return document.condition(info.building)
        });
        result.contractDay = sellerContractDay.filter((document) => {
            return document.condition(info)
        });
    }
    console.log(result);
    return result;
}
