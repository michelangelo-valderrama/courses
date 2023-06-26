#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct RGB {
    int r;
    int g;
    int b;
    int last;
};

void rgb_set(struct RGB *rgb, int r, int g, int b) {
    if (r + g + b <= 255 * 3 && (r >= 0 && g >= 0 && b >= 0)) {
        rgb->r = r;
        rgb->g = g;
        rgb->b = b;
    }
}

void rgb_invert(struct RGB *rgb) {
    rgb_set(rgb, 255 - rgb->r, 255 - rgb->g, 255 - rgb->b);
}

char *rgb_str(struct RGB *rgb) {
    char *str = malloc(sizeof(char) * 64);
    sprintf(
        str, "RGB: (%i, %i, %i)\nHEX: 0x%02x%02x%02x",
        rgb->r, rgb->g, rgb->b,
        rgb->r, rgb->g, rgb->b
    );

    return str;
}

struct RGB *get_inverted_colors(char *file) {
    int limit = 4;
    struct RGB *inverted = malloc(sizeof(struct RGB) * limit);

    int line_size = 16;
    char *line = malloc(sizeof(char) * line_size);

    FILE *f = fopen(file, "r");

    int i = 0;
    while (fgets(line, line_size, f)) {
        if (i >= limit - 1) {
            limit *= 2;
            inverted = realloc(inverted, sizeof(struct RGB) * limit);
        }
        int values[3];
        char *split = strdup(line);
        for (int i = 0; i < 3; i++) {
            values[i] = atoi(strsep(&split, " "));
        }
        free(split);

        rgb_set(&inverted[i], values[0], values[1], values[2]);
        inverted[i].last = 0;
        rgb_invert(&inverted[i++]);
    }

    inverted[i].last = 1;
    free(line);
    fclose(f);

    return inverted;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        printf("Uso: rgb fichero\n");
        exit(-1);
    }
    struct RGB *inverted = get_inverted_colors(argv[1]);
    for (int i = 0; !inverted[i].last; i++) {
        char *s = rgb_str(&inverted[i]);
        printf("%s\n\n", s);
        free(s);
    }

    free(inverted);
}
