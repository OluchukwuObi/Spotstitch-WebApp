
const logger = require('../../../logger');
const { User } = require('../../../model');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

module.exports = async (req, res) => {
    try {

        console.log("Update Image Code in api/user");
        // make sure the user is authenticated and we can find their ID
        const userId = res?.locals?.jwtData?.id;

        if (!userId) throw new Error('Invalid user ID')

        // check for image in request body
        const picture = req.body.picture
        if (!picture) throw new Error("No image found in request")

        // check if user exists, otherwise throw an error
        const user = await User.findById(userId)
        logger.info({ id: userId }, "searching for user")
        if (!user) throw new Error("User does not exist")
        console.log(user);
        // update user image
        const data = await user.updatePicture(picture)

        // return updated image back to user
        res.status(200).json(createSuccessResponse({ picture: data }));
    } catch (error) {
        logger.error({ error: error.message }, 'Error updating user picture')
        res.status(400).json(createErrorResponse(400, 'Error updating user picture'))
    }
}