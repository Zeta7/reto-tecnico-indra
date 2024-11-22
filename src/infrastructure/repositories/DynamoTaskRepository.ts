import * as uuid from 'uuid';
import { config } from "../../config/config";
import { Task } from "../../domain/entities/Task";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { TaskRepository } from "../../application/ports/TaskRepository";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";

const client: DynamoDBClient = new DynamoDBClient()

const dynamoDbClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client)

class DynamoTaskRepository implements TaskRepository {
  async getAll(): Promise<any[] | null> {
    const params = {
      TableName: config.tableName,
    };

    const { Items } = await dynamoDbClient.send(new ScanCommand(params));

    return Items;
  };

  async getById(id: string): Promise<Task | null | any> {
    const params = {
      TableName: config.tableName,
      Key: { id },
    };

    const { Item } = await dynamoDbClient.send(new GetCommand(params));

    return Item;
  };

  async create(task: Task): Promise<void> {
    const { title, description } = task;

    const params = {
      TableName: config.tableName,
      Item: {
        id: uuid.v1(),
        title,
        description,
        createdAt: new Date().toISOString()
      },
    };

    await dynamoDbClient.send(new PutCommand(params));
  };

  async update(id: string, task: Task): Promise<void> {
    const { title, description } = task;

    const params: UpdateCommandInput = {
      TableName: config.tableName,
      Key: {
        id,
      },
      UpdateExpression: "set",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: "ALL_NEW",
    };

    if (title) {
      params.UpdateExpression += " #t = :title,"
      params.ExpressionAttributeNames["#t"] = "title"
      params.ExpressionAttributeValues[":title"] = title
    };

    if (description) {
      params.UpdateExpression += " #d = :description,"
      params.ExpressionAttributeNames["#d"] = "description"
      params.ExpressionAttributeValues[":description"] = description
    };

    params.UpdateExpression = params.UpdateExpression.slice(0, -1);

    await dynamoDbClient.send(new UpdateCommand(params));
  };

  async delete(id: string): Promise<void> {
    const params = {
      TableName: config.tableName,
      Key: {
        id,
      },
    };

    await dynamoDbClient.send(new DeleteCommand(params));
  };
};

export const taskRepository = new DynamoTaskRepository();