#include <dirent.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char **argv) {
    if (argc != 2) {
        printf("Error argumentos, falta un directorio\n");
        exit(-1);
    }

    struct stat data;
    DIR *dir;
    struct dirent *dp;
    char *file;
    int p1[2], p2[2];

    if (stat(argv[1], &data)) {
        printf("Ha fallado stat\n");
        exit(-1);
    }
    if (!S_ISDIR(data.st_mode)) {
        printf("No es un directorio\n");
        exit(-1);
    }

    dir = opendir(argv[1]);
    while((dp = readdir(dir)) != NULL) {
        if (strcmp(dp->d_name, ".") && strcmp(dp->d_name, "..")) {
            file = malloc(strlen(argv[1]) + strlen(dp->d_name) + 2);
            sprintf(file, "%s/%s", argv[1], dp->d_name);
            stat(file, &data);

            if (S_ISDIR(data.st_mode)) {
                if (fork()) {
                    wait(NULL);
                } else {
                    pipe(p2);

                    // wc
                    if (fork()) {
                        close(0);
                        dup(p2[0]);
                        close(p2[0]);
                        close(p2[1]);

                        printf("Numero de ficheros en %s: ", file);
                        fflush(stdout);
                        execlp("wc", "wc", "-l", NULL);
                        printf("Error wc\n");
                        exit(-1);
                    } else {
                        pipe(p1);

                        // grep
                        if (fork()) {
                            close(0);
                            dup(p1[0]);
                            close(1);
                            dup(p2[1]);

                            close(p1[0]);
                            close(p1[1]);
                            close(p2[0]);
                            close(p2[1]);

                            execlp("grep", "grep", "^-", NULL);
                            printf("Error grep\n");
                            exit(-1);
                        }
                        // ls
                        else {
                            close(1);
                            dup(p1[1]);
                            close(p1[1]);
                            close(p1[0]);
                            close(p2[0]);
                            close(p2[1]);

                            execlp("ls", "ls", "-l", file, NULL);
                            printf("Error ls\n");
                            exit(-1);
                        }
                    }
                }
            }
            free(file);
        }
    }
    closedir(dir);
}
