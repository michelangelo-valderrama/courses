#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <time.h>

int main(int argc, char **argv) {
    if (argc != 2) {
        printf("Hace falta un fichero\n");
        exit(-1);
    }

    struct stat data;
    char file_type[32];

    if (stat(argv[1], &data) != 0) {
        printf("Ha fallado la llamada a stat\n");
        exit(-1);
    }
    printf("Fichero: %s\n", argv[1]);

    switch (data.st_mode & S_IFMT) {
        case S_IFREG:
            strcpy(file_type, "Fichero Regular");
            break;
        case S_IFDIR:
            strcpy(file_type, "Directorio");
            break;
        default:
            printf("Error determinando el tipo de fichero\n");
            exit(-1);
    }

    printf("TIPO:          %s\n", file_type);
    printf("PERMISOS:      %o\n", data.st_mode & 0777);
    printf("PROPIETARIO:   %lu\n", data.st_uid);
    printf("ENLACES DUROS: %lu\n", data.st_nlink);
    printf("TAMAÑO:        %lu\n", data.st_size);
    printf("INODO:         %lu\n", data.st_ino);
    printf("ULTIMO ACCESO: %s\n", ctime(&data.st_mtime));
}
