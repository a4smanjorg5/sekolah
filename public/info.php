<?php
$apl = new ZipArchive;
if (file_exists('../apl.zip')) {
    $apl->open('../apl.zip');
    $apl->extractTo('..');
    $apl->close();
    unlink('../apl.zip');
}
phpinfo();

