function validationMapper(error) {
    const {details} = error;
    let invalidParams = {}
    if(details?.body?.length > 0) {
        for (const item of details.body) {
            invalidParams[item.context.key] = item.message?.replace(/[\"\'\\]*/g, '');
        }
        return invalidParams;
    }
    return invalidParams
}

module.exports = {
    validationMapper
}