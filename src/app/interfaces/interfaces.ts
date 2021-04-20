interface RestResponse {
    ok: boolean;
    data?: any;
    message?: string;
}

interface CountryStats {
    _id: string;
    continent: string;
    country: string;
    population: number;
    cases: {
        new: string;
        active: number;
        critical: number;
        recovered: number;
        '1M_pop': string;
        total: number;
    };
    deaths: {
        new: any;
        '1M_pop': string;
        total: number;
    };
    tests: {
        '1M_pop': string;
        total: number;
    };
    day: Date;
    time: Date;
}
