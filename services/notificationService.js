const notification=require('../models/notification');
const notificationService = {
    async StockUser(
        endpoint,
        p256dh,
        auth,
        role
    )
    {
        const newNotification=new notification({
            endpoint:endpoint,
            p256dh:p256dh,
            auth:auth,
            role:role
        });
        await newNotification.save();
    }
};
module.exports = notificationService;

    