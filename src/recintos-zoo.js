class RecintosZoo {

    constructor() {
        this.animals = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
        
        this.enclosures = [
            { id: 1, biome: "savana", totalSize: 10, animals: [{ species: "MACACO", count: 3 }] },
            { id: 2, biome: "floresta", totalSize: 5, animals: [] },
            { id: 3, biome: ["savana", "rio"], totalSize: 7, animals: [{ species: "GAZELA", count: 1 }] },
            { id: 4, biome: "rio", totalSize: 8, animals: [] },
            { id: 5, biome: "savana", totalSize: 9, animals: [{ species: "LEAO", count: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animalData = this.animals[animal];

        
        if (!animalData) {
            return { erro: "Animal inválido" };
        }

    
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const availableEnclosures = this.enclosures.reduce((validEnclosures, enclosure) => {
            const currentOccupancy = enclosure.animals.reduce((total, occupant) => {
                const animalSize = this.animals[occupant.species].tamanho;
                const animalCount = occupant.count;
                return total + (animalSize * animalCount);
            }, 0);
            
        
            const hasDifferentSpecies = enclosure.animals.some(existingAnimal => {
                return existingAnimal.species !== animal;
            });
        
            
            const extraSpace = hasDifferentSpecies ? 1 : 0;
        
            
            const animalSize = animalData.tamanho;
            const requiredSpaceForNewAnimals = animalSize * quantidade;
            const totalRequiredSpace = requiredSpaceForNewAnimals + extraSpace;
        
            
            const freeSpace = enclosure.totalSize - currentOccupancy - totalRequiredSpace;

        
            const biomeMatches = animalData.biomas.some(b => enclosure.biome.includes(b));
            const hasEnoughSpace = freeSpace >= 0;
        
            if (biomeMatches && hasEnoughSpace) {
                const isCarnivoreAlone = animalData.carnivoro && enclosure.animals.every(a => a.species === animal);
                const canCoexist = !animalData.carnivoro && !enclosure.animals.some(a => this.animals[a.species].carnivoro);
                const hippoCondition = animal === "HIPOPOTAMO" && enclosure.biome.includes("rio") && enclosure.biome.includes("savana");
        
                if (isCarnivoreAlone || canCoexist || hippoCondition) {
                    validEnclosures.push(`Recinto ${enclosure.id} (espaço livre: ${freeSpace} total: ${enclosure.totalSize})`);
                }
            }

            return validEnclosures;
        }, []);


        if (availableEnclosures.length > 0) {
            return { recintosViaveis: availableEnclosures };
        }

        return { erro: "Não há recinto viável" };
    }
}


const zoo = new RecintosZoo();

const result1 = zoo.analisaRecintos("MACACO", 2);
console.log(result1);

const result2 = zoo.analisaRecintos("UNICORNIO", 1);
console.log(result2);

const result3 = zoo.analisaRecintos("LEAO", 0);
console.log(result3);

const result4 = zoo.analisaRecintos("LEAO", 3);
console.log(result4);

export { RecintosZoo as RecintosZoo };