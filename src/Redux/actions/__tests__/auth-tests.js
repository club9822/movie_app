jest.mock('../auth').loginUser;

import {loginUser} from '../auth';

it('loginUser 1', () => {
    expect.assertions(1);
    return loginUser('hriks','gt4043@1').then(data => expect(data.status).toEqual(200));
});
it('loginUser 2', () => {
    expect.assertions(1);
    return loginUser('111','2222').catch(data => expect(data.status).toEqual(400));
});