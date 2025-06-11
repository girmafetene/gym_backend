
import AppDataSource from "../config/data-source";
import { DietItem } from "../entities/DietItem";


export class DietItemService {
    private repo = AppDataSource.getRepository(DietItem);

    async create(data: Partial<DietItem>) {
        const item = this.repo.create(data);
        return this.repo.save(item);
    }

    async findAll() {
        return this.repo.find({ relations: ['dietPlan'] });
    }

    async findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['dietPlan'] });
    }

    async update(id: string, data: Partial<DietItem>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.repo.delete(id);
    }
}
