import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand, 
  UpdateCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-west-2'});

const dynamoDb = DynamoDBDocumentClient.from(client);

const TABLE = 'api-gateway-test';

function onlyContainsChar(str, char) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== char) {
            return false;
        }
    }
    return true;
}

export const handler = async (event) => {
  const request = event['httpMethod'];
  let data = await dynamoDb.send(
    new ScanCommand({ TableName: TABLE })
  );
  // data = data.Items;
  const response = {
  isBase64Encoded: false,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
  };

  if ((typeof data) === 'object') {
    response.statusCode = 200;
    
    var path = JSON.stringify(event['path']);
    path.replace('"','');
    const pathArray = path.split("/");
    // pathArray.pop()
    pathArray.shift();
    pathArray[pathArray.length-1] = pathArray[pathArray.length-1].replace('\"','');
    const businessPath = data['Items'][0];
    const userPath = data['Items'][1];
    const eventBody = event['body'];
    switch (request) {
     case 'GET':
      return data['Items']
      // if (pathArray[0] == 'business') {
      //  let result = businessPath;
      //  if (pathArray.length >= 1) {
      //   result = result['entityName'];
      //   for (let i = 1; i < pathArray.length; i++) {
      //        result = result[pathArray[i]];
      //    }
      //  }
      //  response.body = JSON.stringify(result);
      // }
      // else if (pathArray[0] == 'user'){
      //  let result = userPath;
      //  if (pathArray.length >= 1) {
      //   result = result['entityName'];
      //   for (let i = 1; i < pathArray.length; i++) {
      //        result = result[pathArray[i]];
      //    }
      //  }
      //  response.body = JSON.stringify(result);
      // }
      // else {
      //  response.body = JSON.stringify(data['Items']);
      // }
      break;
    }
  }
};