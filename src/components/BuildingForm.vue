<template>
  <v-form v-on:input="output" class="pa-lg-2 text-h6">
    <div>Vous {{ customerGoal === 'buy' ? 'achetez' : 'vendez' }}...</div>
    <v-radio-group v-model="building.type">
      <v-radio label="Une parcelle de terre" value="land"/>
      <v-radio label="Un terrain à bâtir" value="constructibleLand"/>
      <v-radio label="Un terrain à bâtir en lotissement" value="constructibleLandInSubdivision"/>
      <v-radio label="Un lot de copropriété" value="coownershipLot"/>
      <v-radio label="Un immeuble à usage commercial" value="commercialBuilding"/>
      <v-radio label="Une maison individuelle" value="house"/>
    </v-radio-group>

    <div v-if="customerGoal === 'buy'">
      <v-expand-transition>
        <div class="mt-10" v-if="building.type !== null">
          <div class="mb-4 text-h5">Informations sur le bien</div>
          <v-text-field id="address" v-model="building.address" :rules="[rules.required]" label="Adresse complète du bien" required outlined/>
          <v-text-field id="price" v-model="building.price" :rules="[rules.required, rules.price]" label="Prix de vente négocié avec le vendeur" type="number" suffix="€" required outlined/>

          <div>Le montant du séquestre (dépôt de garantie) a-t-il été convenu avec {{ buyerSeller }} ?</div>
          <v-radio-group v-model="building.guaranteeAgreed" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed">
              <div>Quel est le montant du séquestre (dépôt de garantie) convenu avec {{ buyerSeller }} ?</div>
              <v-radio-group v-model="building.guaranteeType">
                <v-radio label="5% du prix de vente" value="5%"/>
                <v-radio label="10% du prix de vente" value="10%"/>
                <v-radio label="Montant précis" value="preciseAmount"/>
                <v-radio label="Absence de séquestre" value="noGuarantee"/>
              </v-radio-group>
              <v-expand-transition>
                <div v-if="building.guaranteeType === 'preciseAmount'">
                  <v-text-field id="price" v-model="building.guaranteeAmount" :rules="[rules.required, rules.price]" label="Montant du séquestre" type="number" suffix="€" required outlined/>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>

          <v-expand-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed === false">
              <div class="text-subtitle-2 mb-7">Merci de discuter de ce point avec le vendeur et de nous transmettre le souhait des parties.</div>
            </div>
          </v-expand-transition>

          <div>L'acquisition est-elle négociée par une agence immobilière ou un mandataire immobilier ?</div>
          <v-radio-group v-model="building.realEstateAgency" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.realEstateAgency">
              <div>Les frais d'agence sont à la charge...</div>
              <v-radio-group v-model="building.realEstateAgencyFees" row>
                <v-radio label="Du vendeur" value="seller"/>
                <v-radio label="De l'acquéreur" value="buyer"/>
              </v-radio-group>
            </div>
          </v-expand-transition>


          <div class="mt-10 mb-4 text-h5">Financement de l'acquisition</div>
          <div>L'acquisition est financée à l'aide...</div>
          <v-radio-group v-model="building.fundingType">
            <v-radio label="D'un emprunt" value="loan"/>
            <v-radio label="De deniers personnels" value="ownMoney"/>
            <v-radio label="D'un emprunt et de deniers personnels" value="loanAndOwnMoney"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.fundingType === 'loan' || building.fundingType === 'loanAndOwnMoney'">
              <div class="mb-4">Informations sur l'emprunt</div>
              <v-text-field v-model="building.fundingLoanAmount" :rules="[rules.required, rules.price]" label="Montant emprunté" type="number" suffix="€" required outlined/>
              <v-text-field v-model="building.fundingLoanRate" :rules="[rules.required, rules.rate]" label="Taux de l'emprunt" type="number" suffix="%" required outlined/>
              <v-text-field v-model="building.fundingLoanDuration" :rules="[rules.required, rules.duration]" label="Durée de l'emprunt" type="number" suffix="ans" required outlined/>
            </div>
          </v-expand-transition>

          <v-expand-transition>
            <div v-if="building.fundingType === 'ownMoney' || building.fundingType === 'loanAndOwnMoney'">
              <div class="mb-4">Informations sur les deniers personnels</div>
              <v-text-field v-model="building.fundingOwnMoneyAmount" :rules="[rules.required, rules.price]" label="Montant des deniers personnels" type="number" suffix="€" required outlined/>
              <v-text-field v-model="building.fundingOwnMoneyOrigin" :rules="[rules.required]" label="Provenance des fonds" required outlined/>
            </div>
          </v-expand-transition>


          <div class="d-flex">
            <div>Une faculté de substitution est-elle à prévoir ?</div>
            <v-tooltip top open-on-click max-width="300pt">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="pl-2" color="primary" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span class="wrap">Clause selon laquelle une personne choisie par l'acquéreur d'un bien peut acheter le logement à sa place en se substituant à lui.</span>
            </v-tooltip>
          </div>
          <v-radio-group v-model="building.substitution" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>
        </div>
      </v-expand-transition>


    </div>



    <div v-if="customerGoal === 'sell'">
      <v-expand-transition>
        <div v-if="building.type === 'house'">
          <div>La maison a-t-elle moins de 10 ans ?</div>
          <v-radio-group v-model="building.lessThanTenYears" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div v-if="building.type === 'constructibleLandInSubdivision'">
          <div class="d-flex">
            <div>Le lotissement est-il soumis à la déclaration préalable ?</div>
            <v-tooltip top open-on-click max-width="300pt">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="pl-2" color="primary" dark v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span class="wrap">La déclaration préalable concerne uniquement les parcelles non situées en secteur de sauvegarde ou de site classé, ou non concernées par la création d’une voie, d’un espace ou d’équipements communs au lotissement.</span>
            </v-tooltip>
          </div>
          <v-radio-group v-model="building.priorStatement" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le lotissement est-il soumis au permis d'aménager ?</div>
          <v-radio-group v-model="building.arrangeLicence" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div class="mt-10" v-if="building.type !== null">
          <div class="mb-4 text-h5">Informations sur le bien</div>
          <v-text-field id="address" v-model="building.address" :rules="[rules.required]" label="Adresse complète du bien" required outlined/>
          <v-textarea id="description" v-model="building.description" :rules="[rules.required]" label="Description du bien" required outlined/>
          <v-text-field id="price" v-model="building.price" :rules="[rules.required, rules.price]" label="Prix de vente négocié avec l'acquéreur" type="number" suffix="€" required outlined/>

          <div v-if="building.type === 'coownershipLot' || building.type === 'house'">
            <div>Le bien est actuellement...</div>
            <v-radio-group v-model="building.currentResidents">
              <v-radio label="Occupé par moi" value="occupied"/>
              <v-radio label="Loué" value="rented"/>
              <v-radio label="Vide" value="empty"/>
            </v-radio-group>

            <v-expand-transition>
              <div v-if="building.currentResidents === 'occupied'">
                <div>Le bien est-il votre résidence principale ?</div>
                <v-radio-group v-model="building.mainResidence" row>
                  <v-radio label="Oui" :value="true"/>
                  <v-radio label="Non" :value="false"/>
                </v-radio-group>
              </div>
            </v-expand-transition>
          </div>

          <div class="mb-4">Quel est votre centre d'imposition ?</div>
          <v-text-field id="taxableResidence" v-model="building.taxableResidence" :rules="[rules.required]" label="Centre d'imposition" required outlined/>

          <div>Le montant du séquestre (dépôt de garantie) a-t-il été convenu avec {{ buyerSeller }} ?</div>
          <v-radio-group v-model="building.guaranteeAgreed" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed">
              <div>Quel est le montant du séquestre (dépôt de garantie) convenu avec {{ buyerSeller }} ?</div>
              <v-radio-group v-model="building.guaranteeType">
                <v-radio label="5% du prix de vente" value="5%"/>
                <v-radio label="10% du prix de vente" value="10%"/>
                <v-radio label="Montant précis" value="preciseAmount"/>
                <v-radio label="Absence de séquestre" value="noGuarantee"/>
              </v-radio-group>
              <v-expand-transition>
                <div v-if="building.guaranteeType === 'preciseAmount'">
                  <v-text-field id="price" v-model="building.guaranteeAmount" :rules="[rules.required, rules.price]" label="Montant du séquestre" type="number" suffix="€" required outlined/>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>

          <v-expand-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed === false">
              <div class="text-subtitle-2 mb-7">Merci de discuter de ce point avec l’acquéreur et de nous transmettre le souhait des parties.</div>
            </div>
          </v-expand-transition>

          <div>La vente est-elle négociée par une agence immobilière ou un mandataire immobilier ?</div>
          <v-radio-group v-model="building.realEstateAgency" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.realEstateAgency">
              <div>Les frais d'agence sont à la charge...</div>
              <v-radio-group v-model="building.realEstateAgencyFees" row>
                <v-radio label="Du vendeur" value="seller"/>
                <v-radio label="De l'acquéreur" value="buyer"/>
              </v-radio-group>
            </div>
          </v-expand-transition>

          <div>L’acquisition a-t-elle été financée par un emprunt ?</div>
          <v-radio-group v-model="building.loan" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Cette vente permet-elle l’acquisition d’un autre bien ?</div>
          <v-radio-group v-model="building.waterfall" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div class="mt-10" v-if="building.type === 'house' || building.type === 'coownershipLot'">
          <div class="mb-4 text-h5">Diagnostics</div>
          <div>Le permis de construire du bien a-t-il été délivré avant le 01 Juillet 1997 ?</div>
          <v-radio-group v-model="building.before1997" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.before1997">
              <div>Le permis de construire du bien a-t-il été délivré avant le 01 Janvier 1949 ?</div>
              <v-radio-group v-model="building.before1949" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-expand-transition>

          <div>L’installation électrique du bien a-t-elle plus de 15 ans ?</div>
          <v-radio-group v-model="building.electricalMoreThan15Years" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il relié au gaz de ville ?</div>
          <v-radio-group v-model="building.cityGas" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.cityGas">
              <div>L’installation du gaz a-t-elle plus de 15 ans ?</div>
              <v-radio-group v-model="building.cityGasMoreThan15Years" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-expand-transition>

          <v-expand-transition>
            <div v-if="building.type === 'coownershipLot'">
              <div>La copropriété a-t-elle été immatriculée plus de 10 ans après l’achèvement des travaux de construction ?</div>
              <v-radio-group v-model="building.immatriculated10Years" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-expand-transition>
        </div>
      </v-expand-transition>

      <v-expand-transition>
        <div class="mt-10" v-if="building.type === 'house' || building.type === 'coownershipLot'">
          <div class="mb-4 text-h5">Informations complémentaires</div>
          <div>Quel est le type d'assainissement du bien ?</div>
          <v-radio-group v-model="building.sanitation">
            <v-radio label="Fosse septique" value="septicTank"/>
            <v-radio label="Tout à l'égoût" value="sewers"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.sanitation === 'sewers'">
              <div>Un contrôle d’assainissement a-t-il été effectué ?</div>
              <v-radio-group v-model="building.sanitationControled" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-expand-transition>

          <div>Le bien possède-t-il une cuve de fioul ?</div>
          <v-radio-group v-model="building.fuelTank" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.fuelTank">
              <div>La cuve de fioul est en...</div>
              <v-radio-group v-model="building.fuelTankMaterial">
                <v-radio label="Métal" value="steel"/>
                <v-radio label="PVC" value="plastic"/>
              </v-radio-group>

              <div>La cuve de fioul est...</div>
              <v-radio-group v-model="building.fuelTankType">
                <v-radio label="Enterrée" value="buried"/>
                <v-radio label="A l'extérieure du bien" value="outdoor"/>
                <v-radio label="A l'intérieure du bien" value="indoor"/>
              </v-radio-group>

              <div>Proposez-vous à l'acheteur le rachat du fioul restant ?</div>
              <v-radio-group v-model="building.fuelTankSellStock" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>

              <v-expand-transition>
                <div v-if="building.fuelTankSellStock">
                  <v-text-field id="fuelPrice" v-model="building.fuelTankSellStockAmount" :rules="[rules.required, rules.price]" label="Montant du rachat de fioul" type="number" suffix="€" required outlined/>
                </div>
              </v-expand-transition>
            </div>
          </v-expand-transition>

          <div>Le bien possède-t-il une citerne de gaz ?</div>
          <v-radio-group v-model="building.gazTank" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.gazTank">
              <div>Avez-vous un contrat de location pour la citerne de gaz ?</div>
              <v-radio-group v-model="building.gazTankRented" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-expand-transition>

          <div>Le bien possède-t-il une pompe à chaleur ?</div>
          <v-radio-group v-model="building.heatPump" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien possède-t-il une ou plusieurs cheminée(s) ?</div>
          <v-radio-group v-model="building.firePlace" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.firePlace">
              <v-text-field id="firePlaceCount" v-model="building.firePlaceCount" :rules="[rules.required, rules.count]" label="Nombre de cheminée(s)" type="number" min="1" pattern="\d+" required outlined/>
            </div>
          </v-expand-transition>

          <div>Le bien possède-t-il un ou plusieurs poêle(s) ?</div>
          <v-radio-group v-model="building.stove" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.stove">
              <v-text-field id="stoveCount" v-model="building.stoveCount" :rules="[rules.required, rules.count]" label="Nombre de poêle(s)" type="number" min="1" pattern="\d+" required outlined/>
            </div>
          </v-expand-transition>

          <div>Le bien possède-t-il un récupérateur d'eau (dont puits et forages) ?</div>
          <v-radio-group v-model="building.waterCollector" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il équipé de détecteur(s) de fumée ?</div>
          <v-radio-group v-model="building.smokeDetectors" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il équipé de WC de type broyeur ?</div>
          <v-radio-group v-model="building.crusherToilets" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien possède-t-il une piscine ?</div>
          <v-radio-group v-model="building.swimmingPool" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Des travaux ont-ils été effectués sur le bien vendu ?</div>
          <v-radio-group v-model="building.houseWorks" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Un sinistre affecte-t-il ou a-t-il affecté le bien vendu ?</div>
          <v-radio-group v-model="building.sinister" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il vendu avec du mobilier ?</div>
          <v-radio-group v-model="building.soldWithFurnitures" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="building.soldWithFurnitures">
              <div class="mb-3 mt-3">Meubles</div>
              <div class="text-body-1">Merci d'indiquer la liste précise des meubles vendus avec le bien ainsi que leur valeur.</div>

              <v-container class="col-lg-8 col-md-10 col-sm-12">
                <v-list v-for="(furniture, index) in building.furnitures" :key="furniture.id" flat class="pb-0">
                  <v-divider class="mb-2" v-if="index > 0"/>
                  <div class="d-flex mb-2">
                    <div>Meuble n°{{ index + 1 }}</div>
                    <v-spacer/>
                    <v-btn icon @click="removeFurniture(index)" class="delete-button">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                  <v-row>
                    <div class="col-md-9 col-sm-8 pr-0">
                      <v-text-field v-model="furniture.name" :rules="[rules.required]" label="Nom" required outlined/>
                    </div>
                    <div class="col-md-3 col-sm-4">
                      <v-text-field v-model="furniture.price" :rules="[rules.required, rules.price]" label="Prix" type="number" suffix="€" required outlined/>
                    </div>
                  </v-row>
                </v-list>
              </v-container>
              <v-btn block @click="addFurniture" color="primary">
                <v-icon class="mr-2">mdi-plus</v-icon>Ajouter un meuble
              </v-btn>
            </div>
          </v-expand-transition>
        </div>
      </v-expand-transition>

    </div>
  </v-form>
</template>

<script>

export default {
  name: "BuildingForm",
  data: function(){
    return {
      building: {
        type: null,
        lessThanTenYears: null,
        address: null,
        description: null,
        price: null,
        waterfall: null,
        currentResidents: null,
        guaranteeAgreed: null,
        guaranteeType: null,
        guaranteeAmount: null,
        realEstateAgency: null,
        realEstateAgencyFees: null,
        loan: null,
        mainResidence: null,
        taxableResidence: null,
        priorStatement: null,
        arrangeLicence: null,
        before1949: null,
        before1997: null,
        immatriculated10Years: null,
        electricalMoreThan15Years: null,
        cityGas: null,
        cityGasMoreThan15Years: null,
        sanitation: null,
        sanitationControled: null,
        fuelTank: null,
        fuelTankMaterial: null,
        fuelTankType: null,
        fuelTankSellStock: null,
        fuelTankSellStockAmount: null,
        gazTank: null,
        gazTankRented: null,
        heatPump: null,
        firePlace: null,
        firePlaceCount: null,
        stove: null,
        stoveCount: null,
        waterCollector: null,
        smokeDetectors: null,
        crusherToilets: null,
        swimmingPool: null,
        houseWorks: null,
        sinister: null,
        soldWithFurnitures: null,
        furnitures: [],
        fundingType: [],
        fundingLoanAmount: null,
        fundingLoanRate: null,
        fundingLoanDuration: null,
        fundingOwnMoneyAmount: null,
        fundingOwnMoneyOrigin: null,
        substitution: null,
      },
      rules: {
        required: value => !!value || 'Ce champs est requis',
        price: value => parseFloat(value) > 0 || 'Prix de vente invalide',
        count: value => parseInt(value) > 0 || 'Nombre invalide',
        rate: value => (parseFloat(value) > 0 && parseFloat(value) < 100) || 'Taux invalide',
        duration: value => parseInt(value) > 0 || 'Durée invalide'
      },
      furnitureId: 0
    }
  },
  computed: {
    buySell: function() {
      return this.customerGoal === 'buy' ? 'achetez' : 'vendez';
    },
    buyerSeller: function() {
      return this.customerGoal === 'sell' ? 'l\'acquéreur' : 'le vendeur';
    }
  },
  watch: {
    building: {
      handler: function () {
        this.saveData();
      },
      deep: true
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.building);
    },
    saveData: function() {
      localStorage.setItem('info.building', JSON.stringify(this.building));
    },
    loadData: function() {
      let data = localStorage.getItem('info.building');
      if (data !== null) {
        this.building = JSON.parse(data);
      }
    },
    addFurniture() {
      this.building.furnitures.push({
        id: this.furnitureId++,
        name: null,
        price: null
      });
    },
    removeFurniture(index) {
      this.building.furnitures.splice(index, 1);
    }
  },
  created: function() {
    this.loadData();
  },
  props: ['customerGoal']
}
</script>

<style scoped>

</style>