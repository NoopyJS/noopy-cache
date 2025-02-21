export declare function Cache(options: {
    ttl: number;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
