import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'Validatie lege taken',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Dark/Light mode',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Mobiel touch',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Verwijderen kolom',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Verwijderen taak',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: []
    },
    {
      name: 'done',
      tasks: []
    }
  ]
}
