import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * 다른 property의 내용에 해당 필드값이 포함되어있지 않음을 검증하는 데코레이터
 * @param property 객체 안에서 참조하고자 하는 다른 속성의 이름
 * @param validationOptions 검증 옵션
 * @returns registerDecorator를 호출하는 함수
 */
export function NotIn(property: string, validationOptions?: ValidationOptions) {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      name: 'NotIn',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
      },
    });
  };
}
