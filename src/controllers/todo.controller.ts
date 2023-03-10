import { Request, Response } from 'express'
import { Todo } from '../models/Todo'


export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll()
    res.json({list})
}

export const add = async (req: Request, res: Response) => {
    const { title, done } = req.body

    if(title){
        let newTodo = await Todo.create({
            title: title,
            done: done ? true : false
        })

        res.status(201)
        res.json({ item: newTodo })

    } else {
        res.json({error: 'Dados não enviados'})
    }
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const { title, done } = req.body

    let todo = await Todo.findByPk(id)
    if(todo) {

        if(title){
            todo.title = title
        }

        if(done) {
            switch(done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = true
                    break
                case 'false':
                case '0':
                    todo.done = false
                    break
            }
        }

        await todo.save()
        res.json({ item: todo })
    } else {
        res.json({error: 'Item não enconrado'})
    }
}

export const remove = async (req: Request, res: Response) => {
    const id: string = req.params.id

    let todo = await Todo.findByPk(id)
    if(todo) {
        await todo.destroy()
    }
    res.json({})
}