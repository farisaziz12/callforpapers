import type { CfpCardDTO, CfpDetailDTO, ModerationItemDTO, SearchParams } from '../../../packages/schemas/dto'

export interface AdminStats {
  pendingCount: number
  totalApproved: number
  thisWeek: number
  thisMonth: number
}

export interface ICfpDirectory {
  list(params: SearchParams): Promise<{ items: CfpCardDTO[]; total: number }>
  getBySlug(slug: string): Promise<CfpDetailDTO | null>
  approveModeration(id: string): Promise<void>
  rejectModeration(id: string): Promise<void>
  createModeration(payload: any): Promise<{ id: string }>
  listModeration(): Promise<ModerationItemDTO[]>
  deleteCfp(id: string): Promise<void>
  updateCfp(id: string, data: Partial<CfpDetailDTO>): Promise<void>
  getStats(): Promise<AdminStats>
  refresh(): Promise<void>
}