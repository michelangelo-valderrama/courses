#!/bin/python

from sys import argv

class RGB:
    def __init__(self):
        self.r = 0
        self.g = 0
        self.b = 0

    def set(self, r, g, b):
        if r + g + b <= 255 * 3 and (r >= 0 and g >= 0 and b>= 0):
            self.r = r
            self.g = g
            self.b = b

    def invert(self):
        self.set(255 - self.r, 255 - self.g, 255 - self.b)

    def __str__(self):
        return (
            f'RGB: ({self.r}, {self.g}, {self.b})\n' +
            f'HEX: 0x{self.r:02x}{self.g:02x}{self.b:02x}'
        )


def get_inverted_colors(file):
    inverted = []
    f = open(file)
    for color in f.readlines():
        values = color.split(' ')
        rgb = RGB()
        rgb.set(int(values[0]), int(values[1]), int(values[2]))
        rgb.invert()
        inverted.append(rgb)
    f.close()
    
    return inverted


def main():
    inverted = get_inverted_colors(argv[1])
    for color in inverted:
       print(f'{color}\n') 

    
if __name__ == '__main__':
    main()
