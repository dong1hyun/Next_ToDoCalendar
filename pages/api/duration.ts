import db from '@/app/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

// 기본 핸들러 함수
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, duration } = req.body;
    await db.toDo.update({
      where: { id },
      data: {
        duration
      }
    });
    // 데이터베이스 업데이트 또는 다른 작업 수행
    res.status(200).json({ message: 'Duration updated successfully', duration });
  } 
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      if(id) {
        const response = await db.toDo.findUnique({
          where: {
            id: +id
          },
          select: {
            duration: true,
          }
        });
        res.status(200).json(response.duration);
      }
    } catch(error) {

    }
    // 데이터베이스 업데이트 또는 다른 작업 수행
  }
}
