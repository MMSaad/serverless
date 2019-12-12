import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
const uuid = require('uuid/v4')


const docClient = new AWS.DynamoDB.DocumentClient()
const groupTable = process.env.GROUP_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
    console.log('Create Group',event)

    const data = JSON.parse(event.body)
    const newId = uuid()

    const item =  {
        id: newId,
        ...data
    }

    await docClient.put({
        TableName: groupTable,
        Item: item
    }).promise()

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            item
        })
    }
}