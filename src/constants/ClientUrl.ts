export enum ClientUrl {
    INDEX = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    FORGOT = '/forgot',
    RESET_PASSWORD = '/reset-password',

    HOME = '/home',
    SEARCH = '/search',
    NEWPOST = '/post',
    MESSAGE = '/message',
    PROFILE = '/profile',
    NOTIFICATION = '/notification',
    SETTINGS = '/settings',

    ADMIN = '/admin',

    MESSAGELOG = '/dm/:dmId',
    SPECIFICPOST = '/post/:postId'
}