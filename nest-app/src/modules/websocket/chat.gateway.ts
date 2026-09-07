import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(4321)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('room', ` ${client.id} has connected`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('room', ` ${client.id} has disconnected`);
  }

  // body
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any): void {
    console.log(`Received message from ${client.id}: ${message}`);

    // broadcast message except to the sender
    client.broadcast.emit('room', `Message from ${client.id}: ${message}`);
  }
}
