import { initTy2 } from '@/components/datatype/type';
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_DB;
const client = new MongoClient(uri)

export const test2 = async (type?: string, body?: any) => {
    
    await client.connect();
    
    let db, collection, data2
    db = client.db('Kookproject')
    collection = db.collection('bookmark')
    
    
    
    switch (type) {
        case "post":
            await collection.insertOne(body);
            break;
            
            case "detail":
                data2 = await collection.find(body).toArray();
                break;
                
                case "delete":
                    // data2 = await collection.deleteOne(body);
                    data2 = await collection.deleteOne(body);
                    break;
                    // {$and:[{seq:'337'},{user_id:'112305745806653108481'}]}
            case 'put':
                await collection.updateOne({seq:body?.seq}, {$set:body});

            break;
        }
        
        if (type != 'detail') data2 = await collection.find({}).toArray(); //데이터 모두 가져오기
        client.close();
        
        
        return data2;
    }