  document.addEventListener("DOMContentLoaded", () => {
    $('.summernote').summernote({
        placeholder: "Tell the character's story...",
        tabsize: 2,
        height: 300
    });
});

document.getElementById('roll').addEventListener('click', function() {
    $('.str').val(Math.ceil(Math.random() * 20));
    $('.int').val(Math.ceil(Math.random() * 20));
    $('.dex').val(Math.ceil(Math.random() * 20));
    $('.con').val(Math.ceil(Math.random() * 20));
    $('.cha').val(Math.ceil(Math.random() * 20));
    $('.luc').val(Math.ceil(Math.random() * 20));
});

const fighterMainSkills = ['Slash', 'Shield Bash'];
const mageMainSkills = ['Fire Ball', 'Ice Blast'];
const rangerMainSkills = ['Backstab', 'Multishot'];

const fighterSecSkills = ['Defend', 'Provoke'];
const mageSecSkills = ['Detect Magic', 'Heal'];
const rangerSecSkills = ['Steal', 'Sneak'];

const fighterWeapons = ['Sword and Shield', 'Two-Handed Axe'];
const mageWeapons = ['Staff', 'Wand'];
const rangerWeapons = ['Bow', 'Dagger'];

const fighterArmor = ['Plate Mail', 'Chain Mail'];
const mageArmor = ['Robe', 'Cloak'];
const rangerArmor = ['Leather', 'Scale'];


let changeOptions = function(element, values) {
        $.each(values, function(index, value) {
            $(element).append($('<option></option>').attr('value', value).text(value));
    })
};
document.getElementById('classDrop').addEventListener('change', function() {
    $('#mainSkillSelect').empty();
    $('#secSkillSelect').empty();
    $('#weaponSelect').empty();
    $('#armorSelect').empty();
    switch($('#classDrop option:selected').val()) {
        case 'Fighter' :
            changeOptions($('#mainSkillSelect'), fighterMainSkills);
            changeOptions($('#secSkillSelect'), fighterSecSkills);
            changeOptions($('#weaponSelect'), fighterWeapons);
            changeOptions($('#armorSelect'), fighterArmor);
            break;
        case 'Mage' :
            changeOptions($('#mainSkillSelect'), mageMainSkills);
            changeOptions($('#secSkillSelect'), mageSecSkills);
            changeOptions($('#weaponSelect'), mageWeapons);
            changeOptions($('#armorSelect'), mageArmor);
            break;
        case 'Ranger' :
            changeOptions($('#mainSkillSelect'), rangerMainSkills);
            changeOptions($('#secSkillSelect'), rangerSecSkills);
            changeOptions($('#weaponSelect'), rangerWeapons);
            changeOptions($('#armorSelect'), rangerArmor);
            break;
        
    }
})

if($('#editPage').attr('data-edit') === 'editFlag') {
    window.onload = function () {
        $('#mainSkillSelect').empty();
        $('#secSkillSelect').empty();
        $('#weaponSelect').empty();
        $('#armorSelect').empty();
        switch($('#classDrop option:selected').val()) {
            case 'Fighter' :
                changeOptions($('#mainSkillSelect'), fighterMainSkills);
                changeOptions($('#secSkillSelect'), fighterSecSkills);
                changeOptions($('#weaponSelect'), fighterWeapons);
                changeOptions($('#armorSelect'), fighterArmor);
                break;
            case 'Mage' :
                changeOptions($('#mainSkillSelect'), mageMainSkills);
                changeOptions($('#secSkillSelect'), mageSecSkills);
                changeOptions($('#weaponSelect'), mageWeapons);
                changeOptions($('#armorSelect'), mageArmor);
                break;
            case 'Ranger' :
                changeOptions($('#mainSkillSelect'), rangerMainSkills);
                changeOptions($('#secSkillSelect'), rangerSecSkills);
                changeOptions($('#weaponSelect'), rangerWeapons);
                changeOptions($('#armorSelect'), rangerArmor);
                break;
        }
    }
}



    
