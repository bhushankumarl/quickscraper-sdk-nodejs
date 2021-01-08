export const MOCK = {
    SAMPLE_REQUEST_URL_1: 'https://mylocation.org'
}

export const ENVs = {
    ACCESS_TOKEN: process.env.QS_ACCESS_TOKEN || ''
}

test('Validate undefined', async () => {
    expect(MOCK.SAMPLE_REQUEST_URL_1).not.toBeUndefined();
    // expect(MOCK.SAMPLE_REQUEST_URL_1).not.toBeEm();
    expect(ENVs.ACCESS_TOKEN).not.toBeUndefined();
});