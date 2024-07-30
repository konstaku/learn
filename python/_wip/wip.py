def mult_by_five(num):
    return num * 5


def call(fn, num):
    return fn(num)


def square_call(fn, num):
    return fn(fn(num))


print(call(mult_by_five, 1), square_call(mult_by_five, 1), sep="\n")
