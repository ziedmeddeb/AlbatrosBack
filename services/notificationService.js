const notification=require('../models/notification');
const notificationService = {
    async StockUser(
        endpoint,
        p256dh,
        auth
    )
    {
        const newNotification=new notification({
            endpoint:endpoint,
            p256dh:p256dh,
            auth:auth
        });
        await newNotification.save();
    }
};
module.exports = notificationService;

    