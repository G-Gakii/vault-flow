{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.python311Full
    pkgs.pipenv
    pkgs.sqlite
  ];
}
