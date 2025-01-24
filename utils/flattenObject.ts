export type IFlattenObject = {
    [x: string]: string | number;
}

export default function flattenObject(objectToFlat: IFlattenObject) {
    const finalObject: IFlattenObject = {};

    const flatObjectFn = (obj: IFlattenObject) => {
        for(const key in obj){
            if(typeof obj[key] === 'object'){
                flatObjectFn(obj[key]);
            }else{
                finalObject[key] = obj[key]
            }
        }
    };

    flatObjectFn(objectToFlat);

    return finalObject;
}