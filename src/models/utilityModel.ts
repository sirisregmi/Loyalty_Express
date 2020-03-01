
enum TRAN_STATUS {
    ORIGINAL = 0,
    REVERSAL = 1,
    VOID = 2
}
enum DRCR {
    C = 1,
    D = 2
}
enum MERCHANT_LEVEL {
    MICRO = 1,
    SMALL = 2,
    MEDIUM = 3,
    LARGE = 4,
    CORPORATE = 5

}
enum ACCOUNTTYPE {
    CUSTOMER = 1,
    MERCHANT = 2
}

enum ROLES {
    CUSTOMER = 1,
    MERCHANT_TELLER = 2,
    MERCHANT_ADMIN = 3,
    ADMIN = 8,
    SUPER = 9
}
export { TRAN_STATUS, DRCR, MERCHANT_LEVEL, ACCOUNTTYPE }