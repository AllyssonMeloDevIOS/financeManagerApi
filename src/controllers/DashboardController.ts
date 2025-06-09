import { Request, Response } from 'express';
import { DashboardService } from '../services/DashboardService';

export class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const data = await DashboardService.getDashboardData(userId);
      return res.json(data);
    } catch (error) {
      console.error('[DASHBOARD ERROR]', error);
      return res.status(500).json({ error: 'Erro ao carregar o dashboard' });
    }
  }

  static async getMonthlyDashboard(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { month, year } = req.query;

      const mes = parseInt(month as string, 10);
      const ano = parseInt(year as string, 10);

      if (isNaN(mes) || isNaN(ano)) {
        return res.status(400).json({ error: 'Mês e ano são obrigatórios e devem ser números válidos' });
      }

      const data = await DashboardService.getMonthlyDashboard(userId, mes, ano);
      return res.json(data);
    } catch (error) {
      console.error('[MONTHLY DASHBOARD ERROR]', error);
      return res.status(500).json({ error: 'Erro ao carregar o dashboard mensal' });
    }
  }
}
