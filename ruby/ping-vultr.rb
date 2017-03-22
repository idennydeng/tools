#! /usr/bin/ruby

def ping(addr)
	result = `ping -c 5 #{addr}`
	result.split("\n").last(3).join("\r\n")
end

hosts = [
	{name: "Frankfurt, DE", addr: "fra-de-ping.vultr.com"},
	{name: "Paris, France", addr: "par-fr-ping.vultr.com"},
	{name: "Amsterdam, NL", addr: "ams-nl-ping.vultr.com"},
	{name: "London, UK", addr: "lon-gb-ping.vultr.com"},
	{name: "Singapore", addr: "sgp-ping.vultr.com"},
	{name: "New York (NJ)", addr: "nj-us-ping.vultr.com"},
	{name: "Tokyo, Japan", addr: "hnd-jp-ping.vultr.com"},
	{name: "Chicago, Illinois", addr: "il-us-ping.vultr.com"},
	{name: "Atlanta, Georgia", addr: "ga-us-ping.vultr.com"},
	{name: "Miami, Florida", addr: "fl-us-ping.vultr.com"},
	{name: "Seattle, Washington", addr: "wa-us-ping.vultr.com"},
	{name: "Dallas, Texas", addr: "tx-us-ping.vultr.com"},
	{name: "Silicon Valley, California", addr: "sjo-ca-us-ping.vultr.com"},
	{name: "Los Angeles, California", addr: "lax-ca-us-ping.vultr.com"}
]

hosts.each do |host|
	puts ping(host[:addr])
	puts "--- #{host[:name]} ---\n\n"
end
