# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.box = 'bento/centos-7.1'
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end
  config.vm.network :private_network, ip: '192.168.33.39'
  config.vm.network :forwarded_port, guest: 22, host: 12222, id: 'ssh'
  config.vm.network :forwarded_port, guest: 9000, host: 19000
  config.ssh.guest_port = 12222
  config.ssh.forward_agent = true
  config.vm.provision 'ansible_local' do |ansible|
    ansible.playbook = 'vagrant.yml'
    ansible.groups = {
      'vagrant' => ['default']
    }
    ansible.verbose  = true
    ansible.install  = true
  end
end
