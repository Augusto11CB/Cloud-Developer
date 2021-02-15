import { GroupAccess } from '../../src/dataLayer/groupsAccess'
import { getGroup } from '../../src/businessLogic/groups'

jest.mock('../../src/dataLayer/groupsAccess')

const group = {
  id: 'group-id',
  name: 'group-name',
  description: 'group-description',
  userId: 'user-id'
}

const groupAccessInstance = (GroupAccess as any).mock.instances[0]

test('should return a group from the access layer', async () => {
  groupAccessInstance.getGroup.mockResolvedValue(group)
  const result = await getGroup('group-id')

  expect(result).toEqual(group)
  expect(groupAccessInstance.getGroup).toHaveBeenCalledWith('group-id')
})
pmguk55x2d
3t5pk9pzac
pqsv4ue7rk