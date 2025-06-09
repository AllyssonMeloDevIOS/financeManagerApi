import { AppDataSource } from '../database/data-source';
import { Transaction } from '../entities/Transaction';
import { Between } from 'typeorm';

export class DashboardService {
  static async getDashboardData(userId: string) {
    const repo = AppDataSource.getRepository(Transaction);

    const transactions = await repo.find({
      where: { user: { id: userId } },
      relations: ['category'],
    });

    const receitas = transactions.filter(t => t.type === 'receita');
    const despesas = transactions.filter(t => t.type === 'despesa');

    const totalReceitas = receitas.reduce((sum, t) => sum + Number(t.value), 0);
    const totalDespesas = despesas.reduce((sum, t) => sum + Number(t.value), 0);

    // Despesas por categoria detalhadas
    const despesasPorCategoriaMap: Record<string, { total: number, transactions: any[] }> = {};
    despesas.forEach(t => {
      const category = t.category?.name || 'Sem categoria';
      if (!despesasPorCategoriaMap[category]) {
        despesasPorCategoriaMap[category] = { total: 0, transactions: [] };
      }
      despesasPorCategoriaMap[category].total += Number(t.value);
      despesasPorCategoriaMap[category].transactions.push({
        title: t.title,
        value: Number(t.value),
        date: t.date,
      });
    });

    const despesasPorCategoria = Object.entries(despesasPorCategoriaMap).map(([category, data]) => ({
      category,
      total: data.total,
      transactions: data.transactions,
    }));

    // Receitas por categoria detalhadas
    const receitasPorCategoriaMap: Record<string, { total: number, transactions: any[] }> = {};
    receitas.forEach(t => {
      const category = t.category?.name || 'Sem categoria';
      if (!receitasPorCategoriaMap[category]) {
        receitasPorCategoriaMap[category] = { total: 0, transactions: [] };
      }
      receitasPorCategoriaMap[category].total += Number(t.value);
      receitasPorCategoriaMap[category].transactions.push({
        title: t.title,
        value: Number(t.value),
        date: t.date,
      });
    });

    const receitasPorCategoria = Object.entries(receitasPorCategoriaMap).map(([category, data]) => ({
      category,
      total: data.total,
      transactions: data.transactions,
    }));

    return {
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
      despesasPorCategoria,
      receitasPorCategoria,
    };
  }

  static async getMonthlyDashboard(userId: string, month: number, year: number) {
    const repo = AppDataSource.getRepository(Transaction);

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const transactions = await repo.find({
      where: {
        user: { id: userId },
        date: Between(start, end)
      },
      relations: ['category'],
    });

    const receitas = transactions.filter(t => t.type === 'receita');
    const despesas = transactions.filter(t => t.type === 'despesa');

    const totalReceitas = receitas.reduce((sum, t) => sum + Number(t.value), 0);
    const totalDespesas = despesas.reduce((sum, t) => sum + Number(t.value), 0);

    // Despesas por categoria detalhadas
    const despesasPorCategoriaMap: Record<string, { total: number, transactions: any[] }> = {};
    despesas.forEach(t => {
      const category = t.category?.name || 'Sem categoria';
      if (!despesasPorCategoriaMap[category]) {
        despesasPorCategoriaMap[category] = { total: 0, transactions: [] };
      }
      despesasPorCategoriaMap[category].total += Number(t.value);
      despesasPorCategoriaMap[category].transactions.push({
        title: t.title,
        value: Number(t.value),
        date: t.date,
      });
    });

    const despesasPorCategoria = Object.entries(despesasPorCategoriaMap).map(([category, data]) => ({
      category,
      total: data.total,
      transactions: data.transactions,
    }));

    // Receitas por categoria detalhadas
    const receitasPorCategoriaMap: Record<string, { total: number, transactions: any[] }> = {};
    receitas.forEach(t => {
      const category = t.category?.name || 'Sem categoria';
      if (!receitasPorCategoriaMap[category]) {
        receitasPorCategoriaMap[category] = { total: 0, transactions: [] };
      }
      receitasPorCategoriaMap[category].total += Number(t.value);
      receitasPorCategoriaMap[category].transactions.push({
        title: t.title,
        value: Number(t.value),
        date: t.date,
      });
    });

    const receitasPorCategoria = Object.entries(receitasPorCategoriaMap).map(([category, data]) => ({
      category,
      total: data.total,
      transactions: data.transactions,
    }));

    const meses = [
      '', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    return {
      mes: meses[month],
      ano: year,
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
      despesasPorCategoria,
      receitasPorCategoria,
    };
  }
}
