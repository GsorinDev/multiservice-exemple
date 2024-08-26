import { Controller, Get, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service'; // Assurez-vous que LoggerService est configuré

@Controller()
export class ProxyController {
  private readonly logger = new LoggerService(ProxyController.name);

  constructor(private readonly httpService: HttpService) {}

  @Get('*')
  async proxyRequest(@Req() req: Request, @Res() res: Response) {
    const fullPath = req.url.substring(1); // Get full path excluding the leading '/'

    // Determine the target URL based on the beginning of the fullPath
    let targetService: string;
    if (fullPath.startsWith('chat')) {
      targetService = 'chat-service';
    } else if (fullPath.startsWith('chien')) {
      targetService = 'chien-service';
    } else {
      this.logger.error(`Unknown service for path: ${fullPath}`, fullPath);
      res.status(404).send('Service not found');
      return;
    }

    const url = `http://${targetService}:3000/api/${fullPath}`;
    this.logger.log(`Proxying request to ${url}`);

    try {
      const response = await this.httpService.get(url).toPromise();
      res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Error proxying request to ${url}`, error.message);
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || 'Error');
    }
  }
}
