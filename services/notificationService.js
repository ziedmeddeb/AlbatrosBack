const notification=require('../models/notification');
const webpush = require('web-push');



  const vapidKeys = { // new
    publicKey: 'BEGDn-yTN_RAqKQbhPkPQauzuVUy0XzKAhUsLjmjCCAb-5r8DSRVz4kCYBJVShL5mcT1UxFBRhl-AQ42_-SbU0w', // new
    privateKey: '7dE8s2jlUqxMwlB94bPD-8jbeduegUueDoiY_sR3KZw' // new
  };
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
    },
    async sendNotificationAdmin(msg)
    {
        const admin=await notification.find({role:"admin"});
        const subscription = {
            endpoint: admin.endpoint,
            expirationTime: null,
            keys: {
                auth: admin.auth,
                p256dh: admin.p256dh,
            },
        };
        const payload = {
            notification: {
                title: 'Albatros reservation',
                body: msg,
                icon: 'assets/icons/icon-384x384.png',
                actions: [
                    { action: 'bar', title: 'Focus last' },
                    { action: 'baz', title: 'Navigate last' },
                ],
                data: {
                    onActionClick: {
                        default: { operation: 'openWindow' },
                        bar: {
                            operation: 'focusLastFocusedOrOpen',
                            url: '/signin',
                        },
                        baz: {
                            operation: 'navigateLastFocusedOrOpen',
                            url: '/signin',
                        },
                    },
                },
            },
        };
        
        const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
};

webpush.sendNotification(subscription, JSON.stringify(payload), options)
    .then((_) => {
        console.log('SENT!!!');
        console.log(_);
    })
    .catch((_) => {
        console.log(_);
    });
    } 

};
module.exports = notificationService;

    